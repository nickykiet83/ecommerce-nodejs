$(function() {
    $('#search').keyup(function() {

        var search_term = $(this).val();
        console.log(search_term);
        $.ajax({
            type: 'POST',
            url: '/api/search',
            data: {
                search_term
            },
            dataType: 'json',
            success: function(json) {

                var data = json.hits.hits.map(function(hit) {
                  return hit;
                });

                console.log(data);

            },
            error: function(err) {
                console.error(err);
            }
        });

    });
});