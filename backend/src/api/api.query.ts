export const ComponentConfigRetrievalQuery = `
  WITH RECURSIVE path_parts AS (
    SELECT name, ordinality AS position
      FROM unnest(string_to_array($1, '/')) WITH ORDINALITY AS t(name, ordinality)
    ),
  component_path AS (
      SELECT
          c.id,
          c.name,
          c."parentId",
          1 AS position
      FROM component c
      JOIN path_parts p ON p.position = 1 and P.name = c.name
      WHERE c."parentId" is null

      UNION ALL

      SELECT
          c.id,
          c.name,
          c."parentId",
          cp.position + 1 AS position
      FROM component_path cp
      JOIN component c on c."parentId" = cp.id
      join path_parts p on p.position = cp.position + 1 AND p.name = c.name
  )
  SELECT
      cp.id as "componentId",
      cp.name as "name",
      cp."parentId" as "parentId",
      cfg.id as "configId",
      cfg.revision as "revision",
      cfg.payload as "payload",
      cfg."createdAt" as "configCreatedAt",
      cfg."commitMessage" as "commitMessage",
      cfg."createdBy" as "createdBy"
  from component_path cp
  LEFT JOIN config cfg ON cfg."componentId" = cp.id and cfg.revision = (SELECT MAX(revision) from config group by cfg."componentId")
  ORDER by cp.position
`;
