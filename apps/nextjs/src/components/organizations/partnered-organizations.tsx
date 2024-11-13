import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@battle-stadium/ui";

import { getPartneredOrganizations } from "~/app/server-actions/organizations/actions";

const LOGO_SIZE = 200;

export default async function PartneredOrganizations () {
  const orgs = await getPartneredOrganizations();

  return (
    <div className="mt-4 flex h-full w-full flex-row items-center justify-center bg-transparent">
      <Carousel
        opts={ {
          align: "start",
        } }
        className="flex w-full max-w-2xl flex-col justify-center"
      >
        <CarouselContent>
          { orgs.map((organization, index) => (
            <CarouselItem key={ index } className="md:basis-1/2 lg:basis-1/3">
              <Card className="aspect-square p-0">
                <CardContent className="flex aspect-square items-center justify-center p-0">
                  <Link
                    prefetch={ true }
                    key={ organization.slug }
                    href={ `/organizations/${organization.slug}` }
                  >
                    <Image
                      className="aspect-square rounded-xl"
                      alt={ organization.name ?? "" }
                      aria-label={ organization.name ?? "" }
                      src={ organization.logoUrl ?? "/pokemon/vgc.png" }
                      height={ LOGO_SIZE }
                      width={ LOGO_SIZE }
                    />
                  </Link>
                </CardContent>
              </Card>
            </CarouselItem>
          )) }
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
