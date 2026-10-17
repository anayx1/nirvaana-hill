export default function FormSpamTrap() {
  return (
    <div className="absolute -left-[9999px]" aria-hidden="true">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
