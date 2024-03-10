"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LaneDetail,
  PiplineDetailsWithLanesCardsTagsTickets,
  TicketAndTage,
} from "@/lib/types";
import { useModal } from "@/providers/modal-provider";
import { Lane, Ticket } from "@prisma/client";
import {
  DragDropContext,
  DropResult,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import { Flag, Plus } from "lucide-react";
import CustomeModal from "@/components/global/custom-modal";
import LaneForm from "@/components/forms/lane-form";
import PipelineLane from "./pipeline-lane";


type Props = {
  lanes: LaneDetail[];
  pipelineId: string;
  subaccountId: string;
  pipelineDetails: PiplineDetailsWithLanesCardsTagsTickets;
  updateLanesOrder: (lanes: Lane[]) => Promise<void>;
  updateTicketOrder: (tickets: Ticket[]) => Promise<void>;
};

const PipelineView = ({
  pipelineId,
  subaccountId,
  pipelineDetails,
  updateLanesOrder,
  updateTicketOrder,
  lanes,
}: Props) => {
  const { setOpen } = useModal();
  const router = useRouter();
  const [allLanes, setAllLanes] = useState<LaneDetail[]>();

  useEffect(() => {
    setAllLanes(lanes);
  }, [lanes]);

   const ticketFormAllLanes: TicketAndTage[] = []
   lanes.forEach((item) => {
    item.Tickets.forEach((i) => {
      ticketFormAllLanes.push(i)
    })
   })

   const [allTickets, setAllTickets] = useState<TicketAndTage[]>(ticketFormAllLanes)

  const handleAddLane = () => {
    setOpen(
      <CustomeModal
        title="Create A Lane"
        subheading="Lanes allow you to group ticket"
      >
        <LaneForm pipelineId={pipelineId} />
      </CustomeModal>
    );
  };

  return (
    <DragDropContext onDragEnd={() => {}}>
      <div className="bg-white/60 dark:bg-background/60 rounded-xl p-4 use-automation-zoom-in">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{pipelineDetails?.name}</h1>
          <Button className="flex items-center gap-4 " onClick={handleAddLane}>
            <Plus size={18} /> Create Lane
          </Button>
        </div>
        <Droppable
          droppableId="lanes"
          type="lane"
          direction="horizontal"
          key="lanes"
        >
          {(provided) => (
            <div
              className="flex flex-item gap-x-2 overflow-auto scrollbar"
              ref={provided.innerRef}
            >
              <div className="flex mt-4 ">
                {allLanes?.map((lane, index) => (
                  <>
                    <PipelineLane
                      allTickets={allTickets}
                      setAllTickets={setAllTickets}
                      subaccountId={subaccountId}
                      pipelineId={pipelineId}
                      tickets={lane.Tickets}
                      laneDetails={lane}
                      index={index}
                      key={lane.id}
                    />
                  </>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
        {
          allLanes?.length == 0 && <div className="flex items-center justify-center w-full flex-col">
            <div className="opacity-[100]">
              <Flag width="100%" height="100%" className="text-muted-foreground"/>
              </div>
          </div>
        }
      </div>
    </DragDropContext>
  );
};

export default PipelineView;
