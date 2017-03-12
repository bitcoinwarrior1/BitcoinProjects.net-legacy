export default {
  create({Meteor, LocalState}, antiSpam, queue, $thisForm) {
    LocalState.set('CREATE_QUEUE_ERROR', null);
    if (antiSpam !== '42') {
      swal(
        'Oops...',
        'You failed the spam filter test!',
        'error'
      );
    } else if (queue) {
      let errors = [];
      (console.log(queue));
      if (!queue.dapp_name) {
        errors.push('Dapp Name');
      }
      if (!queue.status) {
        errors.push('Project Status');
      }
      if (!queue.description) {
        errors.push('Description');
      }
      if (!queue.contact) {
        errors.push('Contact');
      }
      if (!queue.contact_email) {
        errors.push('Email');
      }
      if (!queue.site) {
        errors.push('Site URL');
      }
      if (!queue.license) {
        errors.push('Site URL');
      }
      if (!errors.length == 0) {
        swal(
          'You need to fill out these required fields',
          errors.toString(),
          'error'
        );
      } else {
        Meteor.call('queues.submit', queue, (err) => {
          if (err) {
            swal(
              'Oops...',
              err,
              'error'
            );
          } else {
            $('#submitModal').closeModal();
            swal(
              'Thank you.',
              'Your submission will be reviewed.',
              'success'
            );
            $thisForm[0].reset();
          }
        });
      }
    }
  },
  clearErrors({LocalState}) {
    return LocalState.set('CREATE_QUEUE_ERROR', null);
  }
}
