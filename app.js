document.getElementById('upload-image').addEventListener('change', handleImageUpload);
document.getElementById('resize-btn').addEventListener('click', resizeImage);
console.log(document.getElementById('resize-btn'))

let uploadedImage = null;

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (file && file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImage = new Image();
      uploadedImage.src = e.target.result;
      uploadedImage.onload = function () {
        document.getElementById('preview').src = uploadedImage.src;
        document.getElementById('image-preview').classList.remove('hidden');
        document.getElementById('resize-controls').classList.remove('hidden');
      };
    };
    reader.readAsDataURL(file);
  }
}

function resizeImage() {
  console.log(12131)
  const width = parseInt(document.getElementById('width').value);
  const height = parseInt(document.getElementById('height').value);

  if (uploadedImage) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(uploadedImage, 0, 0, width, height);

    const resizedImageUrl = canvas.toDataURL('image/png');
    const downloadLink = document.getElementById('download-link');
    downloadLink.href = resizedImageUrl;
    downloadLink.classList.remove('hidden');
  }
}
