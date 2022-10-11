with import <nixpkgs> { };

pkgs.mkShell {
  buildInputs = [
    cargo
    openssl_1_1
    pkg-config
  ];
  LD_LIBRARY_PATH = "${lib.getLib openssl_1_1}/lib";
}