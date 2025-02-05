document.addEventListener("DOMContentLoaded", function() {
    let submit = document.getElementsByClassName("btn")[0]; // Correct method name
    async function submitForm (event) {
        event.preventDefault();
        await Swal.fire("Submitted!"); // SweetAlert2 pop-up
    }
    submit.addEventListener("click", submitForm);
});