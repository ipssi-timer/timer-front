module.exports = Modal;

function Modal(args) {

    let defaultParameters = {
        trigger: null,
        onConfirm: () => {},
        onDeny: () => {},
        onClose: () => {},
        id: 'modal'
    };
    args = {...defaultParameters, ...args};

    const {id, onClose, onConfirm, onDeny, trigger} = args;

    const modal = document.getElementById(id);

    $(modal).modal();

    $(modal).on('hidden.bs.modal', function () {
        onClose(modal);
    });

    const denyButton = modal.querySelector('.modal-footer .btn-danger');
    if (denyButton) {
        denyButton.removeEventListener('click', _onDeny, false);
        denyButton.addEventListener('click', _onDeny, false);
    }

    const confirmButton = modal.querySelector('.modal-footer .btn-primary');
    if (confirmButton) {
        confirmButton.removeEventListener('click', _onConfirm);
        confirmButton.addEventListener('click', _onConfirm);
    }

    function _onDeny (event) {
        event.preventDefault();
        onDeny(modal);
        if (trigger) {
            const newTrigger = trigger.cloneNode(true);
            trigger.parentNode.replaceChild(newTrigger, trigger);
            newTrigger.addEventListener('click', () => (new Modal(args)));
        }
        return false;
    }

    function _onConfirm (event) {
        event.preventDefault();
        onConfirm(modal);
        return false;
    }

}