module.exports = ->
  doctype 5
  html ->
    head ->
      title 'QuerI'
      link rel: 'stylesheet', href: '/css/bootstrap.css'
      link rel: 'stylesheet', href: '/css/bootstrap-responsive.css'
      link rel: 'stylesheet', href: '/css/docs.css'
    body 'data-spy': 'scroll', 'data-target': '.subnav', 'data-offset': '50', ->
      div '.navbar.navbar-fixed-top', ->
        div '.navbar-inner',  ->
          div '.container', ->
            a '.brand', href: '/', 'QuerI'
            div '.nav-collapse', ->
              ul '.nav', ->
                li class: @news or '', -> a href: '/', 'Reset'
            #     li class: @team or '', -> a href: '/', 'Reset'
      
      div '.container', ->
        div '.jumbotron', ->
          h1 'QuerI'
          form action: '/', method: 'POST', ->
            p ->
              input '.span12', type: 'text', placeholder: 'select * from table', name: 'q', value: @q or '', autofocus: true
            p style: 'text-align: center', ->
              input '.btn.btn-primary', type: 'submit', value: 'Query'
              text '&nbsp;&nbsp;'
              a '#reset.btn.btn-warning', href: '/', 'Reset'
        div '.row-fluid', ->
          table '.table.table-bordered.table-condensed', ->
            if @headers
              for column in @headers
                th column
            if @results
              for row in @results
                tr ->
                  for own k,v of row
                    td v
      script src: 'http://cdnjs.cloudflare.com/ajax/libs/jquery/1.7.1/jquery.min.js'
      script src: '/js/bootstrap.js'
      coffeescript ->
        $ ->
          $('body').keyup (e) ->
            if e.which == 82 and e.ctrlKey == true
              console.log 'reset'
              $('input[name=q]').val('');
              $('table').html('');
