$(document).ready(function () {
  const checkboxes = document.querySelectorAll(".estado-checkbox");

  $("#deleteBtn").click(function (event) {
    event.preventDefault();

    if (confirm("¿Estás seguro de que quieres eliminar tu cuenta?")) {
      $.ajax({
        url: "/delete-skater",
        method: "DELETE",
        success: function (response) {
          
          if (response.success) {
            // alert("Cuenta eliminada correctamente");
            window.location.href = "/"; 
          } else {
            alert("Ha ocurrido un error al intentar eliminar la cuenta");
          }
        },
        error: function (error) {
          console.error("Error deleting account:", error);
          alert("Ha ocurrido un error al intentar eliminar la cuenta");
        },
      });
    }
  });

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", async (event) => {
      const skaterId = event.target.getAttribute("data-id");
      const newEstado = event.target.checked;

      try {
        const response = await fetch(`/update-estado/${skaterId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado: newEstado }),
        });

        if (!response.ok) {
          throw new Error("Failed to update estado");
        }
      } catch (error) {
        console.error("Error updating estado:", error);
        event.target.checked = !newEstado; 
      }
    });
  });
});

