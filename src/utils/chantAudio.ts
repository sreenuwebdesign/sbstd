/**
 * Web Audio API Background Music Engine for "Om Namo Venkatesaya" Sacred Devotional Chant.
 * Tuned with a low-volume (18%), meditative Tanpura drone, Cosmic Om frequency (136.1Hz),
 * and harmonic temple chimes playing the sacred invocation.
 */

type StateListener = (isPlaying: boolean) => void;

class ChantAudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private volume: number = 0.18; // Default low sound
  private masterGain: GainNode | null = null;
  private droneOscs: OscillatorNode[] = [];
  private droneGains: GainNode[] = [];
  private melodyIntervalId: number | null = null;
  private chantVoiceIntervalId: number | null = null;
  private listeners: StateListener[] = [];

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public addListener(fn: StateListener): () => void {
    this.listeners.push(fn);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.isRunning));
  }

  public isChantPlaying(): boolean {
    return this.isRunning;
  }

  public getVolume(): number {
    return this.volume;
  }

  public setVolume(val: number): void {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public startChant(): boolean {
    if (this.isRunning) return true;
    try {
      const ctx = this.getContext();
      if (!ctx) return false;

      const now = ctx.currentTime;

      // Master Gain set to low sound (0.18)
      this.masterGain = ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, now);

      // Warm low-pass filter to make ambient sound serene and soft
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);
      filter.Q.setValueAtTime(1.5, now);

      this.masterGain.connect(filter);
      filter.connect(ctx.destination);

      // Sacred Tanpura & Cosmic Om Drone (136.1Hz Om fundamental + 144Hz Sa + 216Hz Pa)
      const droneFreqs = [136.1, 144.0, 216.0, 288.0];
      const droneAmps = [0.15, 0.12, 0.08, 0.05];

      this.droneOscs = [];
      this.droneGains = [];

      droneFreqs.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();

        osc.type = i === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Subtle slow lfo modulation for authentic Indian Tanpura breathing
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        lfo.frequency.setValueAtTime(0.25 + i * 0.05, now);
        lfoGain.gain.setValueAtTime(0.02, now);
        lfo.connect(lfoGain);
        lfoGain.connect(g.gain);
        lfo.start(now);

        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(droneAmps[i], now + 2.0); // Gentle fade-in

        osc.connect(g);
        g.connect(this.masterGain!);
        osc.start(now);

        this.droneOscs.push(osc);
        this.droneGains.push(g);
      });

      // Periodic gentle melodic chant motif: "Om Na-mo Ven-ka-te-sa-ya"
      // Frequencies: D4 (293.66), F#4 (370), A4 (440), B4 (493.88), D5 (587.33)
      const playMelodyMotif = () => {
        if (!this.isRunning || !this.ctx || !this.masterGain) return;
        const cTime = this.ctx.currentTime;
        const notes = [
          { f: 293.66, d: 0.8, t: 0 },    // Om
          { f: 369.99, d: 0.6, t: 0.9 },  // Na
          { f: 440.00, d: 0.6, t: 1.6 },  // Mo
          { f: 493.88, d: 0.7, t: 2.3 },  // Ven
          { f: 440.00, d: 0.5, t: 3.1 },  // Ka
          { f: 369.99, d: 0.5, t: 3.7 },  // Te
          { f: 293.66, d: 1.4, t: 4.3 },  // Sa - Ya
        ];

        notes.forEach(({ f, d, t }) => {
          const osc = this.ctx!.createOscillator();
          const g = this.ctx!.createGain();

          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, cTime + t);

          g.gain.setValueAtTime(0, cTime + t);
          g.gain.linearRampToValueAtTime(0.08, cTime + t + 0.08);
          g.gain.exponentialRampToValueAtTime(0.0001, cTime + t + d);

          osc.connect(g);
          g.connect(this.masterGain!);

          osc.start(cTime + t);
          osc.stop(cTime + t + d + 0.1);
        });
      };

      // Play initial motif and schedule every 8 seconds
      playMelodyMotif();
      this.melodyIntervalId = window.setInterval(playMelodyMotif, 8000);

      // Soft vocal chant whisper recitation using SpeechSynthesis (if supported)
      const speakSoftChant = () => {
        if (!this.isRunning || typeof window === 'undefined' || !('speechSynthesis' in window)) return;
        try {
          const synth = window.speechSynthesis;
          if (synth.speaking) return;

          const utterance = new SpeechSynthesisUtterance('Om Namo Venkatesaya');
          utterance.rate = 0.75; // Meditative, slow cadence
          utterance.pitch = 0.8; // Deep, calm voice
          utterance.volume = Math.min(0.2, this.volume); // strictly low sound

          // Prefer Sanskrit or Hindi/Telugu voice if available
          const voices = synth.getVoices();
          const indianVoice = voices.find((v) => 
            v.lang.includes('te') || 
            v.lang.includes('hi') || 
            v.lang.includes('sa') || 
            v.name.toLowerCase().includes('india')
          );
          if (indianVoice) {
            utterance.voice = indianVoice;
          }

          synth.speak(utterance);
        } catch {
          // Ignore speech errors
        }
      };

      // Trigger soft chant whisper every 16 seconds
      setTimeout(speakSoftChant, 1500);
      this.chantVoiceIntervalId = window.setInterval(speakSoftChant, 16000);

      this.isRunning = true;
      this.notify();
      return true;
    } catch {
      this.isRunning = false;
      this.notify();
      return false;
    }
  }

  public stopChant(): void {
    if (!this.isRunning) return;

    if (this.melodyIntervalId) {
      clearInterval(this.melodyIntervalId);
      this.melodyIntervalId = null;
    }

    if (this.chantVoiceIntervalId) {
      clearInterval(this.chantVoiceIntervalId);
      this.chantVoiceIntervalId = null;
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.linearRampToValueAtTime(0, now + 0.5);
      setTimeout(() => {
        this.droneOscs.forEach((osc) => {
          try {
            osc.stop();
            osc.disconnect();
          } catch {
            // ignore
          }
        });
        this.droneOscs = [];
        this.droneGains = [];
      }, 600);
    }

    this.isRunning = false;
    this.notify();
  }

  public toggleChant(): boolean {
    if (this.isRunning) {
      this.stopChant();
      return false;
    } else {
      return this.startChant();
    }
  }
}

export const chantAudio = new ChantAudioEngine();
