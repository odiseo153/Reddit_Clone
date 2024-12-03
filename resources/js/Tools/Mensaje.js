import Swal from "sweetalert2";

const timer =700;

export class Message {
    static errorMessage(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "error",
            title: `¡Oops! ${message}`
        });
    }

    static informationMessage(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "info",
            title: `${message}`
        });
    }

    static successMessage(message) {
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: timer,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: `${message}`
        });
    }

    static async warningNormalMessage(message) {
        let boolAns = false;
        await Swal.fire({
            title: "¡Espera!",
            text: message,
            icon: "warning",
            confirmButtonColor: "rgb(49, 111, 237)",
            confirmButtonText: "¡Sí!",
            showCancelButton: true,
            cancelButtonText: "No",
            allowOutsideClick: false
        }).then((ans) => {
            if (ans.isConfirmed) {
                boolAns = true;
            }
        });
        return boolAns;
    }
}