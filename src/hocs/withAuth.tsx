"use client"

import { Skeleton } from "@/components/ui/skeleton";
import useAuth from "@/context/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
      return <div className="w-full flex h-[calc(100vh-300px)] items-center justify-center gap-4 animate-">
        <Skeleton className="bg-transparent">
          <Image src="/logo_long.svg" alt="logo" width={200} height={200} />
        </Skeleton>
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