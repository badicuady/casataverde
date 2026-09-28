export const systemIds = ['solar', 'heat', 'roof', 'rain', 'smart', 'ceiling'] as const;
export const audiences = ['residential', 'professional', 'unsure'] as const;
export const projectTypes = ['new', 'renovation', 'exploring'] as const;
export const stages = ['planning', 'design', 'building', ''] as const;
export interface Selection {
  audience: string;
  project: string;
  stage: string;
  systems: string[];
}
export function readSelection(params: URLSearchParams): Selection {
  const choose = (name: string, allowed: readonly string[], fallback = '') =>
    allowed.includes(params.get(name) || '') ? params.get(name) || fallback : fallback;
  const selected = params.getAll('systems').flatMap((value) => value.split(','));
  return {
    audience: choose('audience', audiences, 'unsure'),
    project: choose('project', projectTypes, 'exploring'),
    stage: choose('stage', stages),
    systems: systemIds.filter((id) => selected.includes(id)),
  };
}
export function selectionParams(s: Selection): URLSearchParams {
  const params = new URLSearchParams();
  if (audiences.includes(s.audience as (typeof audiences)[number]) && s.audience !== 'unsure')
    params.set('audience', s.audience);
  if (
    projectTypes.includes(s.project as (typeof projectTypes)[number]) &&
    s.project !== 'exploring'
  )
    params.set('project', s.project);
  if (stages.includes(s.stage as (typeof stages)[number]) && s.stage) params.set('stage', s.stage);
  const systems = systemIds.filter((id) => s.systems.includes(id));
  if (systems.length) params.set('systems', systems.join(','));
  return params;
}
export function selectionFromForm(form: HTMLFormElement): Selection {
  const data = new FormData(form);
  const params = new URLSearchParams();
  for (const key of ['audience', 'project', 'stage', 'systems'])
    data.getAll(key).forEach((value) => params.append(key, String(value)));
  return readSelection(params);
}
