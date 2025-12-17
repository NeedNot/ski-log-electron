import { NgClass } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Input, signal, ViewChild } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePause, lucidePlay, lucideTextAlignJustify } from '@ng-icons/lucide';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
  selector: 'app-video-player',
  imports: [NgIcon, HlmIcon, NgClass],
  providers: [provideIcons({lucidePlay, lucidePause})],
  templateUrl: './video-player.html',
})
export class VideoPlayer implements AfterViewInit {
  @Input() src?: String
  @ViewChild('video') video!: ElementRef<HTMLVideoElement>;
  @ViewChild('timeline') timeline!: ElementRef<HTMLInputElement>
  readonly isPlaying = signal(false)
  duration = 0;

  ngAfterViewInit() {
    const v = this.video.nativeElement;
    v.addEventListener('loadedmetadata', () => {
      this.duration = v.duration
    })
    v.addEventListener('play', () => {
      this.isPlaying.set(true)
    })
    v.addEventListener('pause', () => {
      this.isPlaying.set(false)
    })
    v.addEventListener('timeupdate', () => {
      this.timeline.nativeElement.valueAsNumber = v.currentTime
    })
    v.addEventListener('input', () => {
      console.log("user set to ", this.timeline.nativeElement.value)
    })
  }

  play() { this.video.nativeElement.play() }
  pause() {this.video.nativeElement.pause()}
  toggle() {this.video.nativeElement.paused ? this.play() : this.pause()}
  seek(time: number) {
    this.video.nativeElement.currentTime = time
  }
}
