<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

<h1>Welcome to SvelteKit</h1>

<main>
    <p>Start an instance of `lsof` to monitor open file descriptors using the following command</p>
    <pre>watch -n 1 'lsof -Pp {data.pid} | grep TCP'</pre>
    <p>Start the video and randomly seek multiple times</p>
    <p>You should observe the node process use more and more file descriptors each time you seek</p>
    <video src="/api/stream" controls></video>
</main>

<style>
    video {
        height: 720px;
    }
</style>