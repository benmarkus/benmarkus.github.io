{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  name = "portfolio-page";

  buildInputs = [
    pkgs.nodejs_22
  ];

  shellHook = ''
    echo "node $(node --version) / npm $(npm --version)"
  '';
}
