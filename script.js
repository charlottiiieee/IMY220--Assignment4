//Charlotte Green u21434965

$(document).ready(() => {

    // submit handler
    $(".submit").on("click", function() {
        // All your messages should be added to the div with the class of “messages” and “row”. 
        let message = $('#message').val().trim();
        let side = '';

        if ($(this).attr('id') === 'left'){
            side = 'l';
        }

        if ($(this).attr('id') === 'right'){
            side = 'r';
        }

        //check if message exists
        if (message !== '') {
            let newDiv = $('<div></div>', {
                class: 'row col-4 offset-4 rounded mb-3',
                id: `${side}`
            });

            let remainingMessage = message;

            while (remainingMessage.length > 0) {
                // Use a regular expression to find the first YouTube link in the remaining message
                const youtubeRegex = /(https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+))/i;
                const youtubeMatch = remainingMessage.match(youtubeRegex);

                if (youtubeMatch) {
                    // Append the text before the YouTube link
                    const textBeforeLink = remainingMessage.substring(0, youtubeMatch.index);
                    if (textBeforeLink.length > 0) {
                        newDiv.append($('<div></div>').text(message));
                    }

                    // Create an iframe for the YouTube link
                    const videoId = youtubeMatch[2];
                    const iframe = $('<iframe></iframe>', {
                        width: '100%',
                        height: '315px',
                        src: `https://www.youtube.com/embed/${videoId}`,
                        frameborder: '0',
                        allowfullscreen: true
                    });

                    // Update the remaining message to exclude the processed part
                    remainingMessage = remainingMessage.substring(youtubeMatch.index + youtubeMatch[0].length);
                    

                    // Append the iframe with the YouTube link within the text
                    const linkText = youtubeMatch[1];
                    newDiv.append($('<div></div>').append(iframe));

                } else {
                    // No YouTube link found, append the remaining text
                    newDiv.append($('<div></div>').text(remainingMessage));
                    remainingMessage = ''; // Set remainingMessage to empty to exit the loop
                }
            }

            $(newDiv).insertBefore('.messages');
        }
    });

});