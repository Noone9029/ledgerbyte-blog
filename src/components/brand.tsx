import Image from "next/image";
import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="LedgerByte Insights home">
      <span className="brand-mark">
        <Image
          src="/brand/ledgerbyte-mark.png"
          alt=""
          width={44}
          height={44}
          priority
        />
      </span>
      <span className="brand-copy">
        <strong>LEDGERBYTE</strong>
        <span>INSIGHTS</span>
      </span>
    </Link>
  );
}
