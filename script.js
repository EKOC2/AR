// Handles loading the events for <model-viewer>'s slotted progress bar
const onProgress = (event) => {
  const progressBar = event.target.querySelector('.progress-bar');
  const updatingBar = event.target.querySelector('.update-bar');
  updatingBar.style.width = `${event.detail.totalProgress * 100}%`;
  if (event.detail.totalProgress === 1) {
    progressBar.classList.add('hide');
    event.target.removeEventListener('progress', onProgress);
  } else {
    progressBar.classList.remove('hide');
  }
};

document.querySelector('model-viewer').addEventListener('progress', onProgress);

// --- MALZEME YANSIMA AYARLARI ---
// Model yüklendiğinde malzemeleri düzenler
document.querySelector('model-viewer').addEventListener('load', () => {
  const modelViewer = document.querySelector('model-viewer');
  const materials = modelViewer.model.materials;

  materials.forEach((material) => {
    // ROUGHNESS: 0.4 (Hafif yansımalı, ipeksi bir yüzey sağlar)
    // Değeri düşürürseniz yansıma netleşir (ayna gibi), artırırsanız bulanıklaşır (mat).
    material.pbrMetallicRoughness.setRoughnessFactor(0.4);

    // METALNESS: 0.2 (Yansımanın derinliğini ve canlılığını artırır)
    // Malzemenin plastik gibi durmasını engeller.
    material.pbrMetallicRoughness.setMetalnessFactor(0.2);
  });
});
