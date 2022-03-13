import { hasPath, path } from "ramda"


const registry = {}

export const register = (namespace) => (key, stream) => {
  registry[namespace] = {
    ...registry[namespace],
    [key]: stream
  }
  return stream
}

export const getNamespace = (ns) => {
  if (ns in registry) {
    return registry[ns]
  }
  throw new ReferenceError(`No namespace at '${ns}'`)
}

export const getStream = (namespace, key) => {
  if (hasPath([namespace, key], registry)) {
    return path([namespace, key], registry)
  }
  throw new ReferenceError(`No stream at path '${[namespace, key]}'`)
}
