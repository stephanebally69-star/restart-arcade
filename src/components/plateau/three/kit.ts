import { useEffect, useMemo } from 'react'
import * as THREE from 'three'

/** Texture dessinée sur un canvas 2D, redessinée quand `deps` change, libérée au démontage. */
export const useCanvasTexture = (
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D) => void,
  deps: unknown[],
): THREE.CanvasTexture => {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const tex = new THREE.CanvasTexture(canvas)
    tex.colorSpace = THREE.SRGBColorSpace
    tex.anisotropy = 8
    return tex
  }, [width, height])
  useMemo(() => {
    const ctx = (texture.image as HTMLCanvasElement).getContext('2d')!
    ctx.clearRect(0, 0, width, height)
    draw(ctx)
    texture.needsUpdate = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texture, ...deps])
  useEffect(() => () => texture.dispose(), [texture])
  return texture
}
