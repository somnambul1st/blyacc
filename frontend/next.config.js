module.exports = (phase, { defaultConfig }) => {
  if (process.env.NEXT_PUBLIC_API_URL) {
    return {
      ...defaultConfig,
      async rewrites() {
        return [
          {
            source: "/api/:path*",
            destination: `${process.env.NEXT_PUBLIC_API_URL}/:path*`,
          },
          {
            source: "/:path*",
            destination: `http://166.1.160.28:8080/:path*`,
          },
        ]
      },
    }
  }

  return defaultConfig
}
