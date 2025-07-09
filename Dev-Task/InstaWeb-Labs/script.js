document.addEventListener('DOMContentLoaded', () => {
  const draggableElements = document.querySelectorAll('.draggable-element');
  const canvas = document.getElementById('canvas');
  const propertiesPanel = document.querySelector('.properties-panel');
  const noElementSelectedMsg = document.getElementById('no-element-selected');
  const propertiesForm = document.getElementById('properties-form');

  // Properties form elements
  const contentInput = document.getElementById('content-input');
  const fontSizeInput = document.getElementById('font-size-input');
  const colorInput = document.getElementById('color-input');
  const backgroundColorInput = document.getElementById('background-color-input');
  const imageUrlInput = document.getElementById('image-url-input');
  const deleteElementBtn = document.getElementById('delete-element-btn');

  let draggedElement = null;
  let selectedCanvasElement = null;
  // Copied from drag-drop.js for canvas dragging functionality
  let offsetX, offsetY; 

  // --- Drag and Drop Logic ---
  draggableElements.forEach(element => {
    element.addEventListener('dragstart', (e) => {
      draggedElement = e.target;
      e.dataTransfer.setData('text/plain', e.target.dataset.type); // Store element type
      e.dataTransfer.effectAllowed = 'copy';
    });
  });

  canvas.addEventListener('dragover', (e) => {
    e.preventDefault(); // Allow drop
    e.dataTransfer.dropEffect = 'copy';
    canvas.classList.add('selected');
  });

  canvas.addEventListener('dragleave', () => {
    canvas.classList.remove('selected');
  });

  canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    canvas.classList.remove('selected');

    const elementType = e.dataTransfer.getData('text/plain');
    // Copied from drag-drop.js: calculate x, y and pass to createElement
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;

    const newElement = createNewCanvasElement(elementType, x, y); // Pass x, y
    canvas.appendChild(newElement);

    // Select the newly dropped element
    selectCanvasElement(newElement);
  });

  // Modified to accept x, y and set position, and add mousedown listener
  function createNewCanvasElement(type, x, y) {
    const div = document.createElement('div');
    div.classList.add('canvas-element');
    div.setAttribute('tabindex', '0'); // Make it focusable for keyboard selection
    // Set initial position based on drop coordinates
    div.style.left = x + 'px';
    div.style.top = y + 'px';

    switch (type) {
      case 'text':
        div.classList.add('text-block');
        div.textContent = 'Edit this text';
        div.style.fontSize = '16px';
        div.style.color = '#333333';
        div.style.backgroundColor = 'transparent';
        break;
      case 'image':
        div.classList.add('image-element');
        const img = document.createElement('img');
        img.src = 'https://via.placeholder.com/150'; // Default placeholder image
        img.alt = 'Placeholder Image';
        div.appendChild(img);
        div.style.backgroundColor = 'transparent';
        break;
      case 'button':
        div.classList.add('button-element');
        div.textContent = 'Click Me';
        div.style.fontSize = '16px';
        div.style.color = 'white';
        div.style.backgroundColor = '#007bff';
        break;
    }
    // Add mousedown listener for dragging the new element
    div.addEventListener('mousedown', startDrag); 
    return div;
  }

  // --- Element Selection Logic ---
  canvas.addEventListener('click', (e) => {
    const targetElement = e.target.closest('.canvas-element');
    if (targetElement && canvas.contains(targetElement)) {
      selectCanvasElement(targetElement);
    } else if (!e.target.closest('.properties-panel')) {
      // Clicked outside elements and properties panel, deselect
      deselectCanvasElement();
    }
  });

  function selectCanvasElement(element) {
    if (selectedCanvasElement) {
      selectedCanvasElement.classList.remove('selected');
    }
    selectedCanvasElement = element;
    selectedCanvasElement.classList.add('selected');
    selectedCanvasElement.focus(); // Set focus for keyboard interaction

    updatePropertiesPanel();
  }

  function deselectCanvasElement() {
    if (selectedCanvasElement) {
      selectedCanvasElement.classList.remove('selected');
      selectedCanvasElement = null;
    }
    noElementSelectedMsg.style.display = 'block';
    propertiesForm.style.display = 'none';
  }

  // --- Properties Panel Logic ---
  function updatePropertiesPanel() {
    if (!selectedCanvasElement) {
      deselectCanvasElement();
      return;
    }

    noElementSelectedMsg.style.display = 'none';
    propertiesForm.style.display = 'block';

    // Reset all inputs initially
    contentInput.parentElement.style.display = 'none';
    fontSizeInput.parentElement.style.display = 'none';
    colorInput.parentElement.style.display = 'none';
    backgroundColorInput.parentElement.style.display = 'none';
    imageUrlInput.parentElement.style.display = 'none';


    // Populate inputs based on selected element type
    if (selectedCanvasElement.classList.contains('text-block') || selectedCanvasElement.classList.contains('button-element')) {
      contentInput.value = selectedCanvasElement.textContent;
      contentInput.parentElement.style.display = 'block';

      fontSizeInput.value = parseFloat(getComputedStyle(selectedCanvasElement).fontSize);
      fontSizeInput.parentElement.style.display = 'block';

      colorInput.value = rgbToHex(getComputedStyle(selectedCanvasElement).color);
      colorInput.parentElement.style.display = 'block';

      backgroundColorInput.value = rgbToHex(getComputedStyle(selectedCanvasElement).backgroundColor);
      backgroundColorInput.parentElement.style.display = 'block';

    } else if (selectedCanvasElement.classList.contains('image-element')) {
      const img = selectedCanvasElement.querySelector('img');
      if (img) {
        imageUrlInput.value = img.src;
        imageUrlInput.parentElement.style.display = 'block';
      }
    }
  }

  // Event listeners for properties form changes
  contentInput.addEventListener('input', () => {
    if (selectedCanvasElement) {
      selectedCanvasElement.textContent = contentInput.value;
    }
  });

  fontSizeInput.addEventListener('input', () => {
    if (selectedCanvasElement) {
      selectedCanvasElement.style.fontSize = `${fontSizeInput.value}px`;
    }
  });

  colorInput.addEventListener('input', () => {
    if (selectedCanvasElement) {
      selectedCanvasElement.style.color = colorInput.value;
    }
  });

  backgroundColorInput.addEventListener('input', () => {
    if (selectedCanvasElement) {
      selectedCanvasElement.style.backgroundColor = backgroundColorInput.value;
    }
  });

  imageUrlInput.addEventListener('input', () => {
    if (selectedCanvasElement && selectedCanvasElement.classList.contains('image-element')) {
      const img = selectedCanvasElement.querySelector('img');
      if (img) {
        img.src = imageUrlInput.value;
      }
    }
  });

  deleteElementBtn.addEventListener('click', () => {
    if (selectedCanvasElement && confirm('Are you sure you want to delete this element?')) {
      selectedCanvasElement.remove();
      deselectCanvasElement();
    }
  });

  // Helper function to convert RGB to Hex for color inputs
  function rgbToHex(rgb) {
    if (!rgb || rgb.startsWith('rgba')) { // Handle transparent or rgba
      return '#000000'; // Default to black for transparent or unknown
    }
    const parts = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!parts) return '#000000'; // Fallback
    delete (parts[0]);
    for (let i = 1; i <= 3; ++i) {
      parts[i] = parseInt(parts[i]).toString(16);
      if (parts[i].length === 1) parts[i] = '0' + parts[i];
    }
    return '#' + parts.join('');
  }

  // Copied from drag-drop.js for dragging existing elements (adjusted to use selectedCanvasElement)
  function startDrag(e) {
    // Ensure that dragging only starts on the element itself, not its children unless explicitly clicked on them
    if (e.target !== this && !this.contains(e.target)) return;
    
    // Set selectedCanvasElement for dragging purposes if not already selected
    if (selectedCanvasElement !== this) {
        selectCanvasElement(this);
    }

    const rect = this.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    
    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', stopDrag);
  }

  function dragElement(e) {
    if (!selectedCanvasElement) return; // Use selectedCanvasElement
    
    const canvasRect = canvas.getBoundingClientRect();
    let x = e.clientX - canvasRect.left - offsetX;
    let y = e.clientY - canvasRect.top - offsetY;
    
    // Boundary checks
    x = Math.max(0, Math.min(x, canvasRect.width - selectedCanvasElement.offsetWidth)); // Use selectedCanvasElement
    y = Math.max(0, Math.min(y, canvasRect.height - selectedCanvasElement.offsetHeight)); // Use selectedCanvasElement
    
    selectedCanvasElement.style.left = x + 'px'; // Use selectedCanvasElement
    selectedCanvasElement.style.top = y + 'px'; // Use selectedCanvasElement
  }

  function stopDrag() {
    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', stopDrag);
  }
});