personalApp.factory('isotopeInit', function() {

    var isotope = {};

    isotope.innit = function() {

        /* Init Isotope */
        var $container = $('.isotope').isotope({

            itemSelector: '.element-item',
        });

        /* Attach evenst to filter Items */

        $('#filters').on( 'click', 'button', function() {

            var filterValue = $( this ).attr('data-filter');
            // use filterFn if matches value
            $container.isotope({ filter: filterValue });

        });

        // change is-checked class on buttons
        $('.button-group').each( function( i, buttonGroup ) {
            var $buttonGroup = $( buttonGroup );

            $buttonGroup.on( 'click', 'button', function() {
                $buttonGroup.find('.is-checked').removeClass('is-checked');
                $( this ).addClass('is-checked');
            });
        });

        //$container.isotope('shuffle');
        //$container.isotope({filter: 'bbc'});

    };

    return isotope;

});
