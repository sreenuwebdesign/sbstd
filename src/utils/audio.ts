/**
 * Web Audio API synthesizer for auspicious South Indian Temple Bell (గంట నాదం).
 * Provides a warm brass resonance with natural harmonic overtones.
 */

class TempleAudioService {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.ctx = new AudioCtxClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public playTempleBell(): void {
    if (this.isMuted) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      
      // Brass Bell Fundamental & Harmonics
      // Classic Ghanta frequency ~ 784Hz (G5) with rich strike transient and long metallic shimmer
      const frequencies = [784, 1568, 2352, 3136, 420, 1175];
      const gains = [0.4, 0.25, 0.15, 0.08, 0.15, 0.12];
      const decays = [2.8, 1.9, 1.2, 0.8, 3.2, 2.0];

      // Master gain node
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.5, now);
      masterGain.connect(ctx.destination);

      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gainNode = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() * 4 - 2), now);

        gainNode.gain.setValueAtTime(0, now);
        // Fast strike attack
        gainNode.gain.linearRampToValueAtTime(gains[idx], now + 0.008);
        // Exponential bell decay
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

        osc.connect(gainNode);
        gainNode.connect(masterGain);

        osc.start(now);
        osc.stop(now + decays[idx] + 0.1);
      });
    } catch {
      // Ignore audio autoplay restrictions gracefully
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }
}

export const templeAudio = new TempleAudioService();
