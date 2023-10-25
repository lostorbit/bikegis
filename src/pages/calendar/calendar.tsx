export default function Calendar() {
  return (
    <div class="relative w-full h-96">
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=America%2FLos_Angeles&src=c3RldmVucm1hc3NleUBnbWFpbC5jb20&src=NmRiYzBiNzRmN2E2YTVhYmExMzdjZTUxNjQwZDJmMzcwZjA5YjQ5NGVjZmNiNDQ3Y2Q0MWI2ODVmYjQ0ZTBkZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZDRjNTQwNzc2NmQ0MWY0ODRlYThmNzVhMzU2ZjhlNjA3MDMzMWI1YzUwNTNlMDE4ZjI4YzNlOWQxOWRmYmVjYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%234285F4&color=%23009688&color=%23F6BF26&color=%23AD1457&color=%23009688"
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        style={{ border: 0 }}
        aria-hidden="false"
        tabIndex={0}
      ></iframe>
    </div>
  );
}
