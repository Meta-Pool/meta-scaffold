import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import ErrorHandlerHash from "../../components/ErrorHandlerHash";
import PageLoading from "../../components/PageLoading";

export default function ProjectDetailsContainer() {
  const router = useRouter();
  const toast = useToast();
  const id = router.query && router.query.id ? router.query.id : "";
  const transactionHashes = router.query.transactionHashes;
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      setIsLoaded(true);
    })();
  }, [transactionHashes, toast]);

  if (!id || !isLoaded) return <PageLoading />;

  return (
    <>
      <ErrorHandlerHash></ErrorHandlerHash>
    </>
  );
}
