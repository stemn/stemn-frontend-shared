import React from 'react'
import LoadSplitCode from 'stemn-shared/misc/CodeSplitting/LoadSplitCode'
import getRootPath from 'get-root-path'

const otherModules = [{
  global: 'Autodesk',
  src: getRootPath('/static/other/autodesk/viewer-4-1-0/viewer3D.min.js'),
}, {
  global: 'THREE',
  src: getRootPath('/static/other/autodesk/viewer-4-1-0/three.min.js'),
}, {
  src: getRootPath('/static/other/autodesk/viewer-4-1-0/style.min.css'),
}]
const systemImport = () => System.import('../PreviewCad/PreviewCad')

export default props => (
  <LoadSplitCode
    cacheKey="PreviewCad"
    systemImport={ systemImport }
    otherModules={ otherModules }
    { ...props }
  />
)
