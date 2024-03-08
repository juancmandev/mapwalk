alter table "public"."walk_zones" drop column "location";

alter table "public"."walk_zones" add column "polygon_coords" json not null;

alter table "public"."walk_zones" add column "polygon_geopoints" geography(Polygon,4326) not null;


