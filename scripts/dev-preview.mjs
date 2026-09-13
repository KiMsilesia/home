import { spawn } from "node:child_process";

const incoming = process.argv.slice(2);
const args = [];

for (let i = 0; i < incoming.length; i += 1) {
  if (incoming[i] === "--strictPort") continue;
  if (incoming[i] === "--host") {
    args.push("--hostname", incoming[i + 1]);
    i += 1;
    continue;
  }
  args.push(incoming[i]);
}

const child = spawn("next", ["dev", ...args], { stdio: "inherit", shell: true });
child.on("exit", code => process.exit(code ?? 0));
