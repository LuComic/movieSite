defmodule MovieSiteBack.Repo do
  use Ecto.Repo,
    otp_app: :movieSiteBack,
    adapter: Ecto.Adapters.Postgres
end
