// import "swagger-ui-react/swagger-ui.css";
// import SwaggerUI from "swagger-ui-react"
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

import { getAccountMe } from "~/app/server-actions/accounts/actions";

export default async function OpenApiDocs() {
  const { sessionId } = await auth();

  if (!sessionId) {
    return redirect("/");
  }

  const me = await getAccountMe();

  if (!me?.admin) {
    return redirect("/"); // Redirect to home page if account is not an admin)
  }

  // const jsonSpec = yaml.load(await fetchOpenApiYaml());
  // const jsonSpec = '{"openapi": "3.0.1"}';

  return (
    <div className="h-90 w-90 rounded-3xl bg-transparent backdrop-blur">
      <div className="flex flex-row justify-between rounded-3xl p-10">
        <h2>TODO: Swagger DOCS</h2>
        {/* <SwaggerUI displayOperationId={true} spec={jsonSpec} /> */}
      </div>
    </div>
  );
}
