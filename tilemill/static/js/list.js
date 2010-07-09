TileMill.controller.list = function() {
  TileMill.backend.list('project', function(projects) {
    TileMill.backend.list('visualization', function(visualizations) {
      var page = $(TileMill.template('list', {
        projects: TileMill.template('column', { 'name': 'Projects', 'type': 'project', 'data': projects }),
        visualizations: TileMill.template('column', { 'name': 'Visualizations', 'type': 'visualization', 'data': visualizations }),
      }));
      $('input[type=submit]', page).bind('click', function() {
        if ($(this).is('.ajaxing')) {
          return;
        }
        $(this).addClass('ajaxing');
        var type = $(this).parents('form').attr('id'), name = $(this).parents('form').find('.text').val(), self = this;
        if (!name) {
          TileMill.popup.show({ title: 'Error', content: 'Name field is required.' });
          return false;
        }
        TileMill.backend.servers.python.add(name, type, function(data) {
          if (data.status) {
            console.log('success');
          }
          else {
            TileMill.popup.show({ title: 'Error', content: data.message });
          }
          $(self).removeClass('ajaxing');
        })
        return false;
      });
      TileMill.show(page);
    });
  });
}