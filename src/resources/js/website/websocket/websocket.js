
window.Echo.connector.pusher.connection.bind('connected', () => {
    window.is_websocket_conected = true;
    $.ajaxSetup({
        headers: {
            'X-Socket-Id': window.Echo.socketId(),
            'X-Csrf-Token':$('meta[name="csrf-token"]').attr('content'),
            'X-Website-Id':website_id,
        },
        type:'POST',
    });
});

window.websiteChannel = window.Echo.private(`websiteChannel.${website_id}.${auth.type}.${auth.id}`)
window.globalChannel = window.Echo.join(`globalChannel.${website_id}`)
