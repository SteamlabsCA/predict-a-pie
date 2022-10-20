const scroll = (ref) => {
  const id = ref.current.id;
  document.getElementById(id).scrollIntoView({
    behavior: "smooth",
  });
};

export default scroll;
