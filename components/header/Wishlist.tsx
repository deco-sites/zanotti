import Icon from "../ui/Icon.tsx";

const Wishlist = () => {
  return (
    <>
      <a
        href="/wishlist"
        class="font-thin btn-ghost no-animation p-0 hover:bg-transparent"
      >
        <Icon id="wishlist-icon-white" />
      </a>
    </>
  );
};

export default Wishlist;
