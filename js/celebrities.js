$(document).ready(function () {
    $(".lightSlider").lightSlider({
        loop: true,
        pager: false,
        item: 6,
        responsive: [
            {
                breakpoint: 2200,
                setting: {
                    item: 6,
                },
            },
            {
                breakpoint: 1400,
                settings: {
                    item: 6,
                },
            },
            {
                breakpoint: 1242,
                settings: {
                    item: 5,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    item: 4,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    item: 3,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    item: 2,
                },
            },
        ],
    });
});

