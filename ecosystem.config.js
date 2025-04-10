module.exports = {
    apps: [
      {
        name: 'movieSite-test',
        script: 'node_modules/next/dist/bin/next', // Direct path to the Next.js binary
        args: 'start',
        cwd: '/data02/virt133817/movieSite',
        instances: 2,
        exec_mode: 'cluster',
        wait_ready: true,
        listen_timeout: 5000, // Timeout for app to be ready
        cron_restart: '0 0 * * *', // Restart every day at midnight
      },
    ],
};