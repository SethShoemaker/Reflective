using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Reflective.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class init : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Activities",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    TrackingPeriodStart = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    TrackingPeriodEnd = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    ActiveSessionId = table.Column<Guid>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Activities", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ActivityPlan",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ActivityId = table.Column<Guid>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityPlan", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityPlan_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivitySession",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ActivityId = table.Column<Guid>(type: "TEXT", nullable: false),
                    Start = table.Column<DateTime>(type: "TEXT", nullable: false),
                    End = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivitySession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivitySession_Activities_ActivityId",
                        column: x => x.ActivityId,
                        principalTable: "Activities",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActivityPlanVersion",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "TEXT", nullable: false),
                    ActivityPlanId = table.Column<Guid>(type: "TEXT", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "TEXT", nullable: true),
                    TimeOfDay = table.Column<TimeOnly>(type: "TEXT", nullable: false),
                    Duration = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    DaysOfWeek = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActivityPlanVersion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActivityPlanVersion_ActivityPlan_ActivityPlanId",
                        column: x => x.ActivityPlanId,
                        principalTable: "ActivityPlan",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Activities_ActiveSessionId",
                table: "Activities",
                column: "ActiveSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityPlan_ActivityId",
                table: "ActivityPlan",
                column: "ActivityId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivityPlanVersion_ActivityPlanId",
                table: "ActivityPlanVersion",
                column: "ActivityPlanId");

            migrationBuilder.CreateIndex(
                name: "IX_ActivitySession_ActivityId",
                table: "ActivitySession",
                column: "ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Activities_ActivitySession_ActiveSessionId",
                table: "Activities",
                column: "ActiveSessionId",
                principalTable: "ActivitySession",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Activities_ActivitySession_ActiveSessionId",
                table: "Activities");

            migrationBuilder.DropTable(
                name: "ActivityPlanVersion");

            migrationBuilder.DropTable(
                name: "ActivityPlan");

            migrationBuilder.DropTable(
                name: "ActivitySession");

            migrationBuilder.DropTable(
                name: "Activities");
        }
    }
}
