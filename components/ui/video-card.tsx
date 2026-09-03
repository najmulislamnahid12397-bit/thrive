import * as React from "react";
import { VideoCard as BaseVideoCard, VideoCardProps as BaseVideoCardProps } from "@/components/video/video-card";
import type { Video } from "@/lib/types/video";

export interface VideoCardProps extends Omit<BaseVideoCardProps, "video"> {
  video: Video;
}

export function VideoCard({
  video,
  variant = "compact",
  theme = "dark",
  className,
  ...props
}: VideoCardProps) {
  return (
    <BaseVideoCard
      video={video}
      variant={variant}
      theme={theme}
      className={className}
      {...props}
    />
  );
}
