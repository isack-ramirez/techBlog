const postHandler = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#postTitle').value.trim();
    const body = document.querySelector('#postContent').value.trim();
    var user_id = document.querySelector('#secretUserId').value.trim();
    

    var temp = parseInt(user_id);
    user_id = temp;
    console.log(typeof user_id);

    if (title && body && user_id ) {
        console.log(user_id);
        const response = await fetch('/api/posts/', {
        
            method: 'POST',
            body: JSON.stringify({ title, body, user_id}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
             document.location.replace('/');
        } else {
            alert('Failed to add post')
        }
    }
}

document.querySelector('#makePostBtn').addEventListener('click', postHandler);