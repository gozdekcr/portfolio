import { memo, useState } from 'react'
import { coverDataUrl } from './pixelArt'

/**
 * Card face: a real screenshot when `project.image` is set (and loads),
 * otherwise a generated pixel-art cover (see pixelArt.js).
 */
function ProjectCover({ project, showTitle = true, className = 'rounded-3xl' }) {
  const [imgFailed, setImgFailed] = useState(false)
  const useImage = project.image && !imgFailed

  return (
    <div
      className={`relative h-full w-full overflow-hidden ring-1 ring-white/15 ${className}`}
      style={{ background: project.cover.to }}
    >
      {useImage ? (
        <img
          src={`${import.meta.env.BASE_URL}${project.image}`}
          alt=""
          draggable={false}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={coverDataUrl(project)}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover object-top"
          style={{ imageRendering: 'pixelated' }}
        />
      )}

      {showTitle && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/40 to-transparent p-5 pt-16">
          <div className="mb-2 flex flex-wrap gap-1.5">
            {project.categories.map((c) => (
              <span
                key={c}
                className="rounded-full bg-white/20 px-2.5 py-0.5 text-xs font-bold text-white"
              >
                {c}
              </span>
            ))}
          </div>
          <h3 className="text-xl leading-tight font-bold text-white">{project.title}</h3>
        </div>
      )}
    </div>
  )
}

export default memo(ProjectCover)
