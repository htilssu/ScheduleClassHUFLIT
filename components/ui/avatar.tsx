"use client";

import * as React from "react";
import { Avatar as MantineAvatar, Group, MantineSize } from "@mantine/core";
import { cn } from "@/lib/utils/TwMerge";

interface AvatarProps extends React.ComponentPropsWithoutRef<"div"> {
  src?: string;
  alt?: string;
  size?: MantineSize;
  radius?: MantineSize | number;
  color?: string;
  children?: React.ReactNode;
  className?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    {
      className,
      src,
      alt,
      size = "md",
      radius = "xl",
      color,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div ref={ref} className={cn(className)} {...props}>
        <MantineAvatar
          src={src}
          alt={alt || ""}
          size={size}
          radius={radius}
          color={color}
        >
          {children}
        </MantineAvatar>
      </div>
    );
  }
);
Avatar.displayName = "Avatar";

interface AvatarImageProps extends React.ComponentPropsWithoutRef<"img"> {
  src: string;
  alt?: string;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, src, alt, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt || ""}
        className={cn(className)}
        {...props}
      />
    );
  }
);
AvatarImage.displayName = "AvatarImage";

interface AvatarFallbackProps extends React.ComponentPropsWithoutRef<"div"> {
  children: React.ReactNode;
}

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex h-full w-full items-center justify-center rounded-full bg-muted",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
AvatarFallback.displayName = "AvatarFallback";

export { Avatar, AvatarImage, AvatarFallback };
