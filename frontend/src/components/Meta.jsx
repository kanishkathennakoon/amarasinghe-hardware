import { Helmet } from "react-helmet-async";

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: "Welcome to Amarasinghe Hardware",
  description: "We sell the best hardware products",
  keywords: "tools, building materials, electrical, plumbing, painting",
};

export default Meta;
