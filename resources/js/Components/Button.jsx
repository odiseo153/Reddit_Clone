import React from "react";
import PropTypes from "prop-types";

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  href,
  disabled = false,
  loading = false,
  startIcon,
  endIcon,
}) {
  // Clases base comunes a todos los botones
  const baseClasses =
    "inline-flex items-center justify-center rounded font-semibold focus:outline-none transition-all duration-200 ease-in-out";

  // Variantes de estilo
  const variantClasses = {
    primary: "bg-orange-600 text-white hover:bg-orange-700 shadow-md",
    ghost: "text-gray-400 hover:bg-gray-700 shadow-sm",
    outline: "border border-gray-700 text-blue-500 hover:bg-gray-800",
  };

  // Tamaños de botón
  const sizeClasses = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  // Clases de estado
  const stateClasses = disabled
    ? "opacity-50 cursor-not-allowed"
    : "hover:opacity-90";

  // Combina las clases para el botón
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${stateClasses} ${className}`;

  // Contenido del botón con íconos y texto
  const buttonContent = (
    <>
      {loading && (
        <span className="loader mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
      )}
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </>
  );

  // Renderiza <a> o <button> según href y deshabilitación
  if (href) {
    return (
      <a
        href={href}
        className={combinedClasses}
        onClick={onClick}
        aria-disabled={disabled}
      >
        {buttonContent}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
      disabled={disabled || loading}
    >
      {buttonContent}
    </button>
  );
}

// Definir tipos y valores por defecto para las props
Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "ghost", "outline"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  href: PropTypes.string,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
};

Button.defaultProps = {
  variant: "primary",
  size: "md",
  className: "",
  disabled: false,
  loading: false,
  startIcon: null,
  endIcon: null,
};
