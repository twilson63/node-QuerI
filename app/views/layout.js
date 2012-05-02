var __hasProp = Object.prototype.hasOwnProperty;

module.exports = function() {
  doctype(5);
  return html(function() {
    head(function() {
      title('QuerI');
      link({
        rel: 'stylesheet',
        href: '/css/bootstrap.css'
      });
      link({
        rel: 'stylesheet',
        href: '/css/bootstrap-responsive.css'
      });
      return link({
        rel: 'stylesheet',
        href: '/css/docs.css'
      });
    });
    return body({
      'data-spy': 'scroll',
      'data-target': '.subnav',
      'data-offset': '50'
    }, function() {
      div('.navbar.navbar-fixed-top', function() {
        return div('.navbar-inner', function() {
          return div('.container', function() {
            a('.brand', {
              href: '/'
            }, 'QuerI');
            return div('.nav-collapse', function() {
              return ul('.nav', function() {
                return li({
                  "class": this.news || ''
                }, function() {
                  return a({
                    href: '/'
                  }, 'Reset');
                });
              });
            });
          });
        });
      });
      div('.container', function() {
        div('.jumbotron', function() {
          h1('QuerI');
          return form({
            action: '/',
            method: 'POST'
          }, function() {
            p(function() {
              return input('.span12', {
                type: 'text',
                placeholder: 'select * from table',
                name: 'q',
                value: this.q || '',
                autofocus: true
              });
            });
            return p({
              style: 'text-align: center'
            }, function() {
              input('.btn.btn-primary', {
                type: 'submit',
                value: 'Query'
              });
              text('&nbsp;&nbsp;');
              return a('#reset.btn.btn-warning', {
                href: '/'
              }, 'Reset');
            });
          });
        });
        return div('.row-fluid', function() {
          return table('.table.table-bordered.table-condensed', function() {
            var column, row, _i, _j, _len, _len2, _ref, _ref2, _results;
            if (this.headers) {
              _ref = this.headers;
              for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                column = _ref[_i];
                th(column);
              }
            }
            if (this.results) {
              _ref2 = this.results;
              _results = [];
              for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
                row = _ref2[_j];
                _results.push(tr(function() {
                  var k, v, _results2;
                  _results2 = [];
                  for (k in row) {
                    if (!__hasProp.call(row, k)) continue;
                    v = row[k];
                    _results2.push(td(v));
                  }
                  return _results2;
                }));
              }
              return _results;
            }
          });
        });
      });
      script({
        src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      });
      script({
        src: '/js/bootstrap.js'
      });
      return coffeescript(function() {
        return $(function() {
          return $('body').keyup(function(e) {
            if (e.which === 82 && e.ctrlKey === true) {
              console.log('reset');
              $('input[name=q]').val('');
              return $('table').html('');
            }
          });
        });
      });
    });
  });
};
