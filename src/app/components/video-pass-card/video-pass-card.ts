import { Component } from '@angular/core';
import { HlmCard, HlmCardImports } from "@spartan-ng/helm/card";
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucidePause, lucidePlay } from '@ng-icons/lucide';
import { VideoPlayer } from "../video-player/video-player";

@Component({
  selector: 'app-video-pass-card',
  imports: [HlmCardImports, VideoPlayer],
  templateUrl: './video-pass-card.html',
  providers: [provideIcons({lucidePause, lucidePlay})]
})
export class VideoPassCard {

}
