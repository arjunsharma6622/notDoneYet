"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/context/useAuth";
import { LoaderCircle } from "lucide-react";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const WithAuthComponent = (props: any) => {
    const { auth } = useAuth();
    const { isAuthenticated } = auth;
    const router = useRouter();

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to the login page if not authenticated
      }
    }, [isAuthenticated, router]);

    // Show a loading state or nothing until the redirection happens
    if (!isAuthenticated) {
      return  <div className="w-full flex h-[calc(100vh-200px)] items-center flex-col justify-center">
        <LoaderCircle strokeWidth={1.5} className="w-10 h-10 animate-spin text-gray-500" />
      </div>;
    }

    return <WrappedComponent {...props} />;
  };

  // Add a display name for easier debugging
  WithAuthComponent.displayName = `WithAuth(${getDisplayName(WrappedComponent)})`;

  return WithAuthComponent;
};

// Helper function to get the display name of a component
const getDisplayName = (WrappedComponent: React.ComponentType) => {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
};

export default withAuth;