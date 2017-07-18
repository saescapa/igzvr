$(document).ready(() => {
  // const sceneEl = document.querySelector('a-scene')
  // const entity = sceneEl.querySelector('a-entity')
  // const camera = document.querySelector('[camera]')
  window.setTimeout(spawnTarget,1000)
  
  // console.log(document.querySelector('a-entity').getAttribute('position'))
  
  // let target = sceneEl.querySelector('a-cylinder');
  // if (target) {
  //   target.addEventListener('tap', (ev) => {
  //     console.log('click');
  //     addSphere();
  //   });
  // }
  
  // addSphere();
})

// Component to change to random color on click.
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', function (evt) {
      console.log('I was clicked at: ', evt.detail.intersection.point);
      addSphere();
    });
  }
});

function addSphere() {
  const sceneEl = document.querySelector('a-scene')

  let sphere = document.createElement('a-sphere')
  sphere.setAttribute('position', '0 2 -3')
  sphere.setAttribute('radius', 0.1)
  sceneEl.appendChild(sphere)
}

function spawnTarget() {
  const sceneEl = document.querySelector('a-scene')
  
  const targetGroup = document.createElement('a-entity')
  
  const targetImg = document.createElement('a-cylinder')
  targetImg.setAttribute('radius', '0.5')
  targetImg.setAttribute('height', '0')
  targetImg.setAttribute('color', 'purple')
  targetImg.setAttribute('material', 'src: #diana;')
  targetImg.setAttribute('cursor-listener')
  
  const targetBase = document.createElement('a-cylinder')
  targetBase.setAttribute('radius', '0.5')
  targetBase.setAttribute('height', '0.3')
  targetBase.setAttribute('color', 'purple')
  targetImg.setAttribute('position', '0 -0.16 0')
  
  targetGroup.setAttribute('id', 'target')
  targetGroup.appendChild(targetImg)
  targetGroup.appendChild(targetBase)
  
  let posX, posY, posZ
  posX = aleatorio(-4, 4, [0,1])  
  posY = 2 // we have to change this and calculate the angle
  posZ = aleatorio(-4, 4, [0,1])
  targetGroup.setAttribute('position', posX + " " + posY  + " " + posZ)

  let angleX = 90, angleY, angleZ = 0
  angleY = Math.atan(posX / posZ) * (180/Math.PI) // transform to degrees
  angleY = posZ < 0 && posZ !== posX ? angleY + 180 : angleY
  targetGroup.setAttribute('rotation', angleX + " " + angleY  + " " + angleZ)
  
  sceneEl.appendChild(targetGroup)
  
  // console.log(camera.object3D.getWorldDirection())
}

function aleatorio(min,max, excluded){
  let aleat = Math.floor(Math.random()*(max-min+1)+min)
  if (excluded.indexOf(aleat) !== -1){
    return aleatorio(min, max, excluded)
  }
  return aleat
}