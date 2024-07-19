document.addEventListener("DOMContentLoaded", function() {
    // Selecciona todos los elementos con la clase fade-in dentro de la clase container
    const elements = document.querySelectorAll('.container .fade-in');
  
    // Itera sobre los elementos seleccionados
    elements.forEach(element => {
      // Agrega una clase adicional para iniciar la animación
      element.classList.add('fade-in-active');
    });
  });
  
  
  